import { combineReducers, Reducer } from 'redux';
import { board } from './board/board';
import { IState } from './IState';
import { IAction } from '../actions/IAction';

export const app: Reducer<IState, IAction> = combineReducers({
  board,
});
