import { combineReducers } from 'redux';
import { byId } from './byId/byId';

export const items = combineReducers({ byId });
