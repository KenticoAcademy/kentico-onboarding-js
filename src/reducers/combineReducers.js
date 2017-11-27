import combineReducers from 'redux/src/combineReducers';
import items from './root/items/itemList/items';

export const combinedReducers = combineReducers({ items });
