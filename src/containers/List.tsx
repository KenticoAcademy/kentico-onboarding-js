import * as React from 'react';
import { connect } from 'react-redux';
import { List as ListComponent, IListStateProps, IListDispatchProps } from '../components/List';
import { getKeys } from '../utils/getKeys';
import { IAppState } from '../reducers/interfaces/IAppState';
import { Dispatch } from 'redux';
import { setListSorting } from '../actions/ListActions';
import { ListSorting } from '../constants/ListSorting';

const mapStateToProps = (state: IAppState): IListStateProps => ({
  itemIds: getKeys(state.list.items),
  sorting: state.list.sorting,
});

const mapDispatchToProps = (dispatch: Dispatch): IListDispatchProps => ({
  onSetListView: (view: ListSorting) => dispatch(setListSorting(view))
});

export const List: React.ComponentClass = connect(mapStateToProps, mapDispatchToProps)(ListComponent);

