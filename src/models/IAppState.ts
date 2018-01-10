import { Collection } from 'immutable';
import { ListItem } from './ListItem';
import { Uuid } from '../utils/generateId';

export interface IAppState {
  readonly todoList: {
    readonly items: Collection<Uuid, ListItem>;
  };
  fetchStatus: {
    isFetching: boolean,
    hasError: boolean,
    errorMessage: string
  };
  postStatus: {
    hasError: boolean,
    errorMessage: string
  };
}
