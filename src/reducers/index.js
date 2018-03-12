import { combineReducers } from 'redux';

import { items } from './list/items';

const application = combineReducers({ items });
export default application;
