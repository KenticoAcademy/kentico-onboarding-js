import { Record } from 'immutable';

import { getEmptyIdentifier } from '../utils/uuidService';

export const ToDoItem = Record({
  key: getEmptyIdentifier(),
  value: '',
}, 'toDo');
