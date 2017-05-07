import * as React from 'react';
import { connect } from 'react-redux';

import { fetchItems } from '../actions/actionCreators';
import { IAppState } from '../stores/IAppState';
import { Dispatch } from '../stores/Dispatch';
import { ILoaderCallbacksProps, ILoaderDataProps, loader } from '../components/Loader';
import { List } from './ListContainer';

function mapStateToProps(state: IAppState): ILoaderDataProps {
  return {
    isLoading: state.isFetching,
  };
}

function mapDispatchToProps(dispatch: Dispatch): ILoaderCallbacksProps {
  return {
    load: () => dispatch(fetchItems()),
  };
}

const LoaderContainer: React.ComponentClass<ILoaderDataProps & ILoaderCallbacksProps>
  = connect(mapStateToProps, mapDispatchToProps)(loader(List));

export { LoaderContainer };
