import { combineReducers } from 'redux';

import { items } from './items';

const application = combineReducers({ items });
export default application;
