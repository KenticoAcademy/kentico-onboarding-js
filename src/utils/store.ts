import {
  applyMiddleware,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { logger } from 'redux-logger';
import { OrderedMap } from 'immutable';
import { app as reducer } from '../reducers/app';
import { getInitialItems } from './getInitialItems';
import { Item } from '../models/Item';
import { IItemState } from '../reducers/board/items/items';

const getOrderMapFromItems = (items: Item[]): IItemState =>
  OrderedMap<Guid, Item>(items.map((item) => [item.id, item]));

export const initialItems = { board: { items: getOrderMapFromItems(getInitialItems()) } };

export const store = createStore(
  reducer,
  initialItems,
  composeWithDevTools(
    applyMiddleware(logger),
  ),
);
