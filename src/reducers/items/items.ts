import {
  combineReducers,
  Reducer
} from 'redux';
import { OrderedMap } from 'immutable';
import { newItemText } from './newItemText';
import { byId } from './byId';
import { Item } from '../../models/Item';
import {
  status,
} from './status';
import { StatusType } from '../../models/Status';

export const items: Reducer<OrderedMap<ItemId, Item> & string & StatusType> = combineReducers({
  byId,
  newItemText,
  status,
});
