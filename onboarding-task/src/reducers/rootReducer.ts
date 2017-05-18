import { IAction } from '../actions/IAction';
import { itemsListReducer } from './itemsListReducer';
import { IAppState } from '../stores/IAppState';

export const rootReducer = (prevState: IAppState = {} as IAppState, action: IAction): IAppState => ({
  itemsList: itemsListReducer(prevState.itemsList, action),
});
