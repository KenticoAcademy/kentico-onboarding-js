import { Record } from 'immutable';

import { getEmptyIdentifier } from '../utils/uuidService';

export const ToDo = Record({
  key: getEmptyIdentifier(),
  value: '',
}, 'toDo');
