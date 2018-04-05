import { items } from './items/index';
import { fetchItemsState } from './fetchItemsState';
import { IListState } from '../../models/state/IListState';
import { combineReducers } from '../../utils/combineReducers';
import { itemsSyncInfo } from './itemsSyncInfo/index';

export const list = combineReducers<IListState>({
  fetchItemsState,
  items,
  itemsSyncInfo,
});
