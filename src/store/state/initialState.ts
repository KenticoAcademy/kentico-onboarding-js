import { IAppState } from './IAppState';
import { OrderedMap } from 'immutable';

export const initialState: IAppState = {
  list: {
    items: OrderedMap(),
    isLoading: true,
  },
};
