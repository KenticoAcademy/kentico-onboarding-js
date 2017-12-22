import { IListItem } from '../models/IListItem';
import { ListItem } from '../models/ListItem';
import { OrderedMap } from 'immutable';
import { Guid } from '../models/Guid';

export const listItemsArrayToOrderedMap = (something: IListItem[]): any =>
  OrderedMap<Guid, ListItem>(
    something.map(item => [item.id, new ListItem(item)])
  );
