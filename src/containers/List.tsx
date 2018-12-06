import * as React from 'react';
import { connect } from 'react-redux';
import { List as ListComponent, IListStateProps, IListDispatchProps } from '../components/List';
import { IAppState } from '../reducers/interfaces/IAppState';
import { Dispatch } from 'redux';
import { setListSorting } from '../actions/ListActions';
import { ListSorting } from '../constants/ListSorting';
import { getKeys } from '../utils/getKeys';
import { sortItems } from '../utils/sortItems';

const mapStateToProps = (state: IAppState): IListStateProps => ({
  itemIds: getKeys(sortItems(state.list.items, state.list.sorting)),
  sorting: state.list.sorting,
});

const mapDispatchToProps = (dispatch: Dispatch): IListDispatchProps => ({
  onSetListView: (view: ListSorting) => dispatch(setListSorting(view))
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

