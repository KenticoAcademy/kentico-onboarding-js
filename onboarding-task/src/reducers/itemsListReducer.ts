import { itemsDataReducer } from './itemsDataReducer';
import { itemsFlagReducer } from './itemsFlagReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsIsFetchingReducer } from './itemsFetchReducer';
import { itemsErrorReducer } from './itemsErrorReducer';
import { IAppState } from '../stores/IAppState';
import { IAction } from '../actions/IAction';

export function itemsListReducer(prevState: IAppState = {} as IAppState, action: IAction): IAppState {
  return {
    items: itemsDataReducer(prevState.items, action),
    itemsOrder: itemsOrderReducer(prevState.itemsOrder, action),
    itemsFlags: itemsFlagReducer(prevState.itemsFlags, action),
    isFetching: itemsIsFetchingReducer(prevState.isFetching, action),
    errors: itemsErrorReducer(prevState.errors, action),
  };
}
