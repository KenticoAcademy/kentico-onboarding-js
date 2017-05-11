import * as React from 'react';
import { connect } from 'react-redux';

import { fetchItems } from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';
import { Dispatch } from '../stores/Dispatch';
import { IListLoaderCallbacksProps, IListLoaderDataProps, loader } from '../components/loader';
import { List } from './ListContainer';

function mapStateToProps(state: IAppState): IListLoaderDataProps {
  return {
    isLoading: state.isFetching,
  };
}

function mapDispatchToProps(dispatch: Dispatch): IListLoaderCallbacksProps {
  return {
    load: () => dispatch(fetchItems),
  };
}

const ListLoaderContainer: React.ComponentClass<{}>
  = connect(mapStateToProps, mapDispatchToProps)(loader(List));

export { ListLoaderContainer };
