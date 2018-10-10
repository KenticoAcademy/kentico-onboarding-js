import * as React from 'react';
import { connect } from 'react-redux';
import {
  ItemError as ItemErrorComponent,
  ItemErrorContainerProps,
  ItemErrorDispatchProps,
  ItemErrorStateProps,
} from '../components/ItemError';
import { IAppState } from '../store/state/IAppState';
import { retryActionRequest } from '../actions/asyncActions';
import { cancelAsyncActionCreator } from '../actions/creators/cancelAsyncActionCreator';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/types/itemsActionTypes';
import { getErrorMessage } from '../utils/getErrorMessage';

const mapStateToProps = (state: IAppState, ownProps: ItemErrorContainerProps): ItemErrorStateProps => ({
  error: getErrorMessage(state, ownProps.id),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Actions>, ownProps: ItemErrorContainerProps): ItemErrorDispatchProps => ({
  cancel: () => dispatch(cancelAsyncActionCreator(ownProps.id)),
  retry: () => dispatch(retryActionRequest(ownProps.id)),
});

export const ItemError: React.ComponentClass<ItemErrorContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemErrorComponent);
