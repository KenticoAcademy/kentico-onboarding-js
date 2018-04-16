import * as memoize from 'memoizee';
import { IAppState } from '../models/IAppState';
import { Uuid } from '../utils/generateId';

const getIds = (items: Uuid[]): Uuid[] => items;

const getIdsMemoized = memoize(getIds, { primitive: true });

export const getItemIds = ({ todoList: { items } }: IAppState): Uuid[] =>
  getIdsMemoized(items.keySeq().toArray());
