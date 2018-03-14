import { Record } from 'immutable';
import { ToDo } from './toDo';

const defaultData = {
  todo: new ToDo(),
  bullet: '',
};

export const Item = Record(defaultData, 'item');
