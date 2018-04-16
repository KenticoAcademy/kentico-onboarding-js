import { combineReducers, Reducer } from 'redux';
import { OrderedMap } from 'immutable';
import { newItemText } from './newItemText';
import { byId } from './byId';
import { ItemId } from '../../models/ItemId';
import { Item } from '../../models/Item';
import { status } from './status';

export const items: Reducer<OrderedMap<ItemId, Item> & string & object> = combineReducers({
  byId,
  newItemText,
  status,
});
