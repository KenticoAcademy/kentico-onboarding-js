import { Collection } from 'immutable';
import { ListItem } from './ListItem';
import { Uuid } from '../utils/generateId';
import { FetchStatus } from './FetchStatus';
import { PostStatus } from './PostStatus';
import { PutStatus } from './PutStatus';

export interface IAppState {
  readonly todoList: {
    readonly items: Collection<Uuid, ListItem>;
  };
  fetchStatus: FetchStatus;
  postStatus: PostStatus;
  putStatus: PutStatus;
}
