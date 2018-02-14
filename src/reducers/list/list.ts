import { items } from './items/items';
import { fetchItemsState } from './fetchItemsState/fetchItemsState';
import { IListState } from '../../models/state/IListState';
import { combineReducers } from '../../utils/combineReducers';

export const list = combineReducers<IListState>({
  items,
  fetchItemsState,
});
