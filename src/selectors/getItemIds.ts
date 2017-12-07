import * as memoize from 'memoizee';
import { Seq } from 'immutable';
import { IAppState } from '../models/IAppState';
import { Uuid } from '../utils/generateId';

const getIds = (items: Uuid[]): Seq.Indexed<Uuid> => Seq(items);

const getIdsMemoized = memoize(getIds, { primitive: true });

export const getItemIds = ({ todoList: { items } }: IAppState): Seq.Indexed<Uuid> =>
  getIdsMemoized(items.keySeq().toArray());
