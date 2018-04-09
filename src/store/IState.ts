import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';
import { Key } from '../@types/Key';
import { IErrorComposition } from '../models/ErrorComposition';

export interface IListStore {
  items: OrderedMap<Key, Item>;
  error: IErrorComposition;
  groupActionsEnabled: boolean;
}

export interface IState {
  list: IListStore;
}
