import { Collection } from 'immutable';
import { ListItem } from './ListItem';
import { Uuid } from '../utils/generateId';
import { FetchStatus } from './FetchStatus';
import { Error } from './Error';

export interface IAppState {
  readonly todoList: {
    readonly items: Collection<Uuid, ListItem>;
  };
  readonly error: Collection<Uuid, Error>;
  readonly fetchStatus: FetchStatus;
}
