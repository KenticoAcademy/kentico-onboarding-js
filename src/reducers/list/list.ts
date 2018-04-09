import { combineReducers } from 'redux';

import { items } from './items';
import { error } from './error';
import { groupActionsEnabled } from './groupActionsEnabled';

export const list = combineReducers({ items, error, groupActionsEnabled });
