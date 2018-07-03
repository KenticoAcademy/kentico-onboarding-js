import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

export interface IListStore {
  items: OrderedMap<Key, Item>;
  errors: OrderedMap<Key, string>;
  groupActionsEnabled: boolean;
  dataLoaded: boolean;
}

export interface IState {
  list: IListStore;
}
