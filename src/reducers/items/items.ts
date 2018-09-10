import {
  combineReducers,
  Reducer
} from 'redux';
import { OrderedMap } from 'immutable';
import { newItemText } from './newItemText';
import { byId } from './byId';
import { ItemId } from '../../models/ItemId';
import { Item } from '../../models/Item';
import {
  status,
  statusType
} from './status';

export const items: Reducer<OrderedMap<ItemId, Item> & string & statusType> = combineReducers({
  byId,
  newItemText,
  status,
});
