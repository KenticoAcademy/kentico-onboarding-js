import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

export interface IState {
  items: OrderedMap<string, Item>;
}
