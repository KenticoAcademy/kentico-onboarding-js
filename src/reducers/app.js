import { combineReducers } from 'redux';

import { list } from './list';

export const app = combineReducers({ list });
