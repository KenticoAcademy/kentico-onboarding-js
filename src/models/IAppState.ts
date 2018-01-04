import { Collection } from 'immutable';
import { ListItem } from './ListItem';
import { Uuid } from '../utils/generateId';

export interface IAppState {
  readonly todoList: {
    readonly items: Collection<Uuid, ListItem>;
  };
  isFetching: boolean;
}
