import memoize from 'memoizee';
import { Seq } from 'immutable';

const getIds = items => Seq(items);

const getIdsMemoized = memoize(getIds, { primitive: true });

export const getItemIds = ({ todoList: { items } }) =>
  getIdsMemoized(items.keySeq().toArray());
