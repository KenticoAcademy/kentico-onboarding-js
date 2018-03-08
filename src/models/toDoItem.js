import { Record } from 'immutable';

export const ToDoItem = Record({
  key: undefined,
  value: '',
  isBeingEdited: false,
  changedValue: '',
}, name);
