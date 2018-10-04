import { IAppState } from '../store/state/IAppState';
import { Content as ContentComponent } from '../components/Content';
import * as React from 'react';
import { connect } from 'react-redux';
import { ContentStateProps } from '../components/Content';

const mapStateToProps = (state: IAppState): ContentStateProps => ({
  error: state.list.error,
  isLoading: state.list.isLoading,
});

export const Content: React.ComponentClass = connect(mapStateToProps)(ContentComponent);
