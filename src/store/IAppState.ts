import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';

export type ItemsState = OrderedMap<Uuid, ListItem>;

export interface IStore {
  readonly  todoList: { items: ItemsState} ;
}
