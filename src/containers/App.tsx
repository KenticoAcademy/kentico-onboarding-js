import { IAppState } from '../store/state/IAppState';
import { App as AppComponent } from '../components/App';
import * as React from 'react';
import { connect } from 'react-redux';
import { AppStateProps } from '../components/App';

const mapStateToProps = (state: IAppState): AppStateProps => ({
  isLoading: state.list.isLoading,
  error: state.list.error,
});

export const App: React.ComponentClass = connect(mapStateToProps)(AppComponent);
