import { combineReducers } from 'redux';
import { items } from './items';
import { Actions } from '../../actions/types/itemsActionTypes';

const isLoading = (state: boolean = true, action: Actions): boolean => {
  switch (action.type) {
    case 'FETCH_ITEMS_SUCCESS':
      return false;
    default:
      return state;
  }
};

const error = (state: string = '', action: Actions): string => {
  switch (action.type) {
    case 'FETCH_ERROR':
        return action.payload.error;
    default:
      return state;
  }
};

export const list = combineReducers({ items, isLoading, error });
