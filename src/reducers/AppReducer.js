import { combineReducers } from 'redux';

import { list } from './ListReducer';

export const AppReducer = combineReducers({ list });
