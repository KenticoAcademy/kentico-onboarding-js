import { Record } from 'immutable';
import { ToDo } from './toDo';

export const Item = Record({
  todo: new ToDo(),
  bullet: '',
}, 'item');
