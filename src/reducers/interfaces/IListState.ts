import { ListItem } from '../../models/ListItem';
import { Map } from 'immutable';
import { ListSorting } from '../../constants/ListSorting';

export interface IListState {
  items: Map<Uuid, ListItem>;
  sorting: ListSorting;
}
