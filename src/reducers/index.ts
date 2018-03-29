import { combineReducers } from 'redux';

import { list } from './list/list';

export const application = combineReducers({ list });
