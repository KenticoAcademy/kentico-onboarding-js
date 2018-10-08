import { combineReducers } from 'redux';
import { board } from './board/board';

export const app = combineReducers({
  board,
});
