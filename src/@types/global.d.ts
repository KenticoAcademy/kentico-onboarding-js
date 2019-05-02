import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { TodoListAction } from '../actions/types/TodoListAction';
import { AppState } from '../store/AppState';
import { ThunkDispatch } from 'redux-thunk';

declare global {
  export type Guid = string;

  export type ListValues = OrderedMap<Guid, ListItem>;

  export type ListDispatch = ThunkDispatch<AppState, never, TodoListAction>;
}
