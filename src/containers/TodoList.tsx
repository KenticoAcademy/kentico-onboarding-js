import * as React from 'react';
import { connect } from 'react-redux';
import {
  TodoListStateProps,
  TodoList,
  TodoListDispatchProps,
} from '../components/TodoList';
import { memoizedIds } from '../selectors/memoizeIds';
import { AppState } from '../store/AppState';
import { getAllItems } from '../actions/thunkActions/getAllItems';


const mapStateToProps = (state: AppState): TodoListStateProps => ({
  itemIds: memoizedIds(state.items.keySeq().toArray()),
  isFetchingAll: state.isFetchingAll,
  hasError: state.hasError,
});

const mapDispatchToProps = (dispatch: ListDispatch): TodoListDispatchProps => ({
  reloadAll: () => dispatch(getAllItems())
});


const TodoListContainer: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(TodoList);
export { TodoListContainer as TodoList };
