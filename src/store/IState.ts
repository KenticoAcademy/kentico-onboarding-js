import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';
import { key } from '../@types/key';

interface IListStore {
  items: OrderedMap<key, Item>;
}

export interface IState {
  list: IListStore;
}
