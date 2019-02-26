import { ListItem } from '../../models/ListItem';
import { Map } from 'immutable';
import { ListSorting } from '../../constants/ListSorting';
import { ListStatus } from './ListStatus';

export interface IListState {
  items: Map<Uuid, ListItem>;
  listStatus: ListStatus;
  sorting: ListSorting;
}
