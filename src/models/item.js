import { Record } from 'immutable';

import { ToDo } from './toDo';

const defaultData = {
  todo: new ToDo(),
  isBeingEdited: false,
  changeableValue: '',
};

export const Item = Record(defaultData, 'item');
