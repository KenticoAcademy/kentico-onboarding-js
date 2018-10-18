import {combineReducers, Reducer} from 'redux';
import {newItemText} from './newItemText';
import {byId} from './byId';
import {status} from './status';
import {IItemsState} from '../IAppState';


export const items: Reducer<IItemsState> = combineReducers({
  byId,
  newItemText,
  status,
});
