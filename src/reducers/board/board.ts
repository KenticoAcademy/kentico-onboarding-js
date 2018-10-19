import { combineReducers, Reducer } from 'redux';
import { IItemState, items } from './items/items';
import { IAction } from '../../actions/IAction';

export interface IBoardState {
  items: IItemState;
}

export const board: Reducer<IBoardState, IAction> = combineReducers({
  items,
});
