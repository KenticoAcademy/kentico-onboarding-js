import { combineReducers } from 'redux';

import { items } from './items';

export const appReducer = combineReducers({ list: items });
