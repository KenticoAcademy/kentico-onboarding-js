import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';
import { Key } from '../@types/Key';

interface IListStore {
  items: OrderedMap<Key, Item>;
}

export interface IState {
  list: IListStore;
}
