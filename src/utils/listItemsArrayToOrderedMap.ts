import { IListItem } from '../models/interfaces/IListItem';
import { ListItem } from '../models/classes/ListItem';
import { OrderedMap } from 'immutable';
import { Guid } from '../models/Guid';

export const listItemsArrayToOrderedMap = (something: IListItem[]) =>
  OrderedMap<Guid, ListItem>(
    something.map(item => [item.id, new ListItem(item)])
  );
