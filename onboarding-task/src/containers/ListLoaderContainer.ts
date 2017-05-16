import * as React from 'react';
import { connect } from 'react-redux';

import { fetchItems } from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';
import { Dispatch } from '../stores/Dispatch';
import { IListLoaderCallbacksProps, IListLoaderDataProps, loader } from '../components/loader';
import { List } from './ListContainer';

const mapStateToProps = (state: IAppState): IListLoaderDataProps => ({
  isLoading: state.isFetching,
});

const mapDispatchToProps = (dispatch: Dispatch): IListLoaderCallbacksProps => ({
  load: () => dispatch(fetchItems),
});

const ListLoaderContainer: React.ComponentClass<{}>
  = connect(mapStateToProps, mapDispatchToProps)(loader(List));

export { ListLoaderContainer };
