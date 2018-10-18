import { combineReducers, Reducer } from 'redux';
import { items } from './items/items';
import { OrderedMap } from 'immutable';
import { Item } from '../../models/Item';
import { IAction } from '../../actions/IAction';

export const board: Reducer<{ items: OrderedMap<Guid, Item> }, IAction> = combineReducers({
  items,
});
