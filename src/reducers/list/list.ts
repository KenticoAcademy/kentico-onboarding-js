import { items } from './items/items';
import { fetchItemsState } from './fetchItemsState/fetchItemsState';
import { IListState } from '../../models/state/IListState';
import { combineReducers } from '../../utils/combineReducers';
import { itemsSyncInfo } from './itemsSyncInfo/itemsSyncInfo';

export const list = combineReducers<IListState>({
  fetchItemsState,
  items,
  itemsSyncInfo,
});
