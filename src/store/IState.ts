import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

interface IListStore {
  items: OrderedMap<Key, Item>;
}

export interface IState {
  list: IListStore;
}
