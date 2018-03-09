import { combineReducers } from 'redux';

import { items } from './items';
import { newItem } from './newItem';

const application = combineReducers({ newItem, items });
export default application;
