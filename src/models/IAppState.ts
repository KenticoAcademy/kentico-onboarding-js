import { Collection } from 'immutable';
import { ListItem } from './ListItem';
import { Uuid } from '../utils/generateId';
import { FetchStatus } from './FetchStatus';
import { Error } from './Error';

export interface ITodoListState {
  readonly items: Collection<Uuid, ListItem>;
}

export interface IAppState {
  readonly todoList: ITodoListState;
  readonly error: Collection<Uuid, Error>;
  readonly fetchStatus: FetchStatus;
}
