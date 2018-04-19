import { Collection } from 'immutable';
import { ListItem } from './ListItem';
import { Uuid } from '../utils/generateId';
import { Error } from './Error';
import { ListPageState } from '../enums/listPageState';

export interface ITodoList {
  readonly items: Collection<Uuid, ListItem>;
}

export interface IAppState {
  readonly todoList: ITodoList;
  readonly error: Collection<Uuid, Error>;
  readonly listPageState: ListPageState;
}
