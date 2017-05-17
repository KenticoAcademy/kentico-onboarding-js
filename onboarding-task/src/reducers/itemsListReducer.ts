import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsIsFetchingReducer } from './itemsFetchReducer';
import { itemsErrorReducer } from './itemsErrorsReducer';
import { IAppState } from '../stores/IAppState';
import { IAction } from '../actions/IAction';

export function itemsListReducer(prevState: IAppState = {} as IAppState, action: IAction): IAppState {
  return {
    items: itemsReducer(prevState.items, action),
    itemsOrder: itemsOrderReducer(prevState.itemsOrder, action),
    itemsFlags: itemFlagsMapReducer(prevState.itemsFlags, action),
    isFetching: itemsIsFetchingReducer(prevState.isFetching, action),
    errors: itemsErrorReducer(prevState.errors, action),
  };
}
