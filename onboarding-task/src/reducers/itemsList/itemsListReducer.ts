import { itemsReducer } from './itemsReducer';
import { itemFlagsMapReducer } from './itemFlagsMapReducer';
import { itemsOrderReducer } from './itemsOrderReducer';
import { itemsIsFetchingReducer } from './itemsFetchReducer';
import { itemsErrorReducer } from './itemsErrorsReducer';
import { IItemsState } from '../../stores/IItemsState';
import { IAction } from '../../actions/IAction';

export const itemsListReducer = (prevState: IItemsState = {} as IItemsState, action: IAction): IItemsState => ({
  items: itemsReducer(prevState.items, action),
  order: itemsOrderReducer(prevState.order, action),
  flags: itemFlagsMapReducer(prevState.flags, action),
  isFetching: itemsIsFetchingReducer(prevState.isFetching, action),
  errors: itemsErrorReducer(prevState.errors, action),
});
