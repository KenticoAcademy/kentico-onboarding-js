import { OrderedMap } from 'immutable';
import { Item } from '../models/Item';

export interface IState {
  readonly items: OrderedMap<Guid, Item>;
}
