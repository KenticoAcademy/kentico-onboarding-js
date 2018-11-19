import * as React from 'react';
import { connect } from 'react-redux';
import {
  ItemError as ItemErrorComponent,
  ItemErrorContainerProps,
  ItemErrorDispatchProps,
  ItemErrorStateProps,
} from '../components/ItemError';
import { IAppState } from '../store/state/IAppState';
import { retryThunkActionThunk } from '../actions/thunkActions/thunkActions';
import { cancelThunkAction } from '../actions/thunkActions/cancelThunkAction';
import { ThunkDispatch } from 'redux-thunk';
import { Actions } from '../actions/types/itemsActionTypes';
import { getErrorMessage } from '../utils/getErrorMessage';

const mapStateToProps = (state: IAppState, ownProps: ItemErrorContainerProps): ItemErrorStateProps => ({
  error: getErrorMessage(state, ownProps.id),
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IAppState, void, Actions>, ownProps: ItemErrorContainerProps): ItemErrorDispatchProps => ({
  cancel: () => dispatch(cancelThunkAction(ownProps.id)),
  retry: () => dispatch(retryThunkActionThunk(ownProps.id)),
});

export const ItemError: React.ComponentClass<ItemErrorContainerProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemErrorComponent);
