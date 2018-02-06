import { combineReducers, Reducer } from 'redux';
import { OrderedMap } from 'immutable';
import { newItemText } from './newItemText';
import { byId } from './byId';
import { ItemId } from '../../models/ItemId';
import { Item } from '../../models/Item';

export const items: Reducer<OrderedMap<ItemId, Item> & string> = combineReducers({
  byId,
  newItemText,
});
