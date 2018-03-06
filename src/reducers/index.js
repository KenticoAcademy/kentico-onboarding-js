import { combineReducers } from 'redux';
import { items } from './items';

const application = combineReducers({ listOfItems: items });

export default application;
