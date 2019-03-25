import { ListItem } from '../../models/ListItem';
import { Map } from 'immutable';
import { ListSorting } from '../../constants/ListSorting';
import { ListStatus } from './ListStatus';
import { NewItemProperties } from '../../models/NewItemProperties';

export interface IListState {
  items: Map<Uuid, ListItem>;
  listStatus: ListStatus;
  sorting: ListSorting;
  newItem: NewItemProperties;
}
