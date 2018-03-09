import { Record } from 'immutable';

import { getEmptyGuid } from '../utils/uuidService';

export const ToDoItem = Record({
  key: getEmptyGuid(),
  value: '',
}, 'toDo');
