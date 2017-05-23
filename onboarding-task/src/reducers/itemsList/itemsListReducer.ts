import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsIsFetchingReducer } from './itemsFetchReducer';
import { itemsErrorReducer } from './itemsErrorsReducer';
import { IItemsListState } from '../IItemsListState';
import { IAction } from '../../actions/IAction';

export const itemsListReducer = (prevState: IItemsListState = {} as IItemsListState, action: IAction): IItemsListState => ({
  items: itemsReducer(prevState.items, action),
  order: itemsOrderReducer(prevState.order, action),
  flags: itemFlagsMapReducer(prevState.flags, action),
  isFetching: itemsIsFetchingReducer(prevState.isFetching, action),
  errors: itemsErrorReducer(prevState.errors, action),
});
