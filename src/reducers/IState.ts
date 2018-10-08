import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

export interface IState {
  readonly board: { items: OrderedMap<Guid, Item> };
}
