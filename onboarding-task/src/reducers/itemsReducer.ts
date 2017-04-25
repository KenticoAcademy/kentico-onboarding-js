import { combineReducers } from 'redux';

import { itemsDataReducer } from './itemsDataReducer';
import { itemsFlagReducer } from './itemsFlagReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsFetchReducer } from './itemsFetchReducer';

const itemsReducer = combineReducers({
  items: itemsDataReducer,
  itemsOrder: itemsOrderReducer,
  itemsDisplayFlags: itemsFlagReducer,
  isFetching: itemsFetchReducer
});

export { itemsReducer };
