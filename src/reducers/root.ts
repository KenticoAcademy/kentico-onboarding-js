import {combineReducers, Reducer} from 'redux';
import {items} from './items/items';
import {IAppState} from './IAppState';


export const root: Reducer<IAppState> = combineReducers({
  items,
});
