import
{
  createStore,
  applyMiddleware,
} from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducers } from '../reducers/applicationReducers';
import { OrderedMap } from 'immutable';
import { ListItem } from '../models/ListItem';
import { TodoListAction } from '../actions/types/TodoListAction';

const initialState = {
  items: OrderedMap<Guid, ListItem>(),
  isFetchingAll: false,
  hasError: false,
  failedActions: OrderedMap<Guid, TodoListAction>(),
};

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);
