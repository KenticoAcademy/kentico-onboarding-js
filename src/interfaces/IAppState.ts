import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';

export interface IAppState {
  list: {
    items: OrderedMap<string, ListItem>;
  };
}
