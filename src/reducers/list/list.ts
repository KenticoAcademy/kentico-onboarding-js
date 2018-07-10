import { combineReducers } from 'redux';

import { items } from './items';
import { error as errors } from './error';
import { groupActionsEnabled } from './groupActionsEnabled';
import { dataLoaded } from './dataLoaded';

export const list = combineReducers({
  items,
  errors,
  groupActionsEnabled,
  dataLoaded,
});
