import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  ItemError as ItemErrorComponent,
  ItemErrorContainerProps,
  ItemErrorDispatchProps,
  ItemErrorStateProps,
} from '../components/ItemError';
import { IAppState } from '../store/state/IAppState';
import { retryActionRequest } from '../actions/asyncActions';
import { cancelAsyncActionCreator } from '../actions/creators/cancelAsyncActionCreator';

const mapStateToProps = (state: IAppState, ownProps: ItemErrorContainerProps): ItemErrorStateProps => ({
  error: ownProps.errorId === ''
    ? ''
    : state
      .list
      .itemErrors
      .get(ownProps.errorId)
      .message,
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: ItemErrorContainerProps): ItemErrorDispatchProps => ({
  cancel: () => dispatch<any>(cancelAsyncActionCreator(ownProps.id)),
  retry: () => dispatch<any>(retryActionRequest(ownProps.id)),
});

export const ItemError: React.ComponentClass<ItemErrorContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemErrorComponent);
