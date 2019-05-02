import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { TodoListAction } from '../actions/types/TodoListAction';

export type AppState = {
  readonly items: OrderedMap<Guid, ListItem>,
  readonly isFetchingAll: boolean,
  readonly hasError: boolean,
  readonly failedActions: OrderedMap<Guid, TodoListAction>,
};
