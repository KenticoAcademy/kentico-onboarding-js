import { ListItem } from '../../models/ListItem';
import { OrderedMap } from 'immutable';

export interface IListState {
  items: OrderedMap<Uuid, ListItem>;
}
