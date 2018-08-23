import { ListItem } from '../../models/ListItem';
import { OrderedMap } from 'immutable';
import { ListSorting } from '../../constants/ListSorting';

export interface IListState {
  items: OrderedMap<Uuid, ListItem>;
  sorting: ListSorting;
}
