import { Record } from 'immutable';
import { ToDoItem } from './toDoItem';

export const Item = Record({
  todo: new ToDoItem(),
  bullet: '',
}, 'item');
