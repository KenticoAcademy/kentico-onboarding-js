import {
  ListItem_ToggleEdited
} from '../constants/todoActionTypes';
import { TodoListAction } from './types/TodoListAction';


export const toggleEdited = (id: Guid): TodoListAction => ({
  type: ListItem_ToggleEdited,
  payload: {
    id
  }
});
