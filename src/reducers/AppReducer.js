import { combineReducers } from 'redux';

import { listReducer } from './ListReducer';

export const AppReducer = combineReducers({ listReducer });
