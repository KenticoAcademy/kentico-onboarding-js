import { IListItem } from '../models/interfaces/IListItem';
import { ListItem } from '../models/classes/ListItem';
import { OrderedMap } from 'immutable';
import { Guid } from '../models/Guid';

export const listItemsArrayToOrderedMap = (items: IListItem[]) =>
  OrderedMap<Guid, ListItem>(
    items.map(item => [item.id, new ListItem(item)])
  );
