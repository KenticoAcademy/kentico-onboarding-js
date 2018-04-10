import { combineReducers } from 'redux';

import { items } from './items';
import { error } from './error';
import { groupActionsEnabled } from './groupActionsEnabled';
import { dataLoaded } from './dataLoaded';

export const list = combineReducers({ items, error, groupActionsEnabled, dataLoaded });
