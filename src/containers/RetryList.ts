import { ComponentClass } from 'react';
import {
  connect,
  Dispatch,
} from 'react-redux';
import {
  Retry as RetryComponent,
  IRetryCallbackProps,
  IRetryProps
} from '../components/Retry';
import {
  fetchItemsAsync,
} from '../actions/thunk';
import { IAppState } from '../models/state/IAppState';

const mapDispatchToProps = (dispatch: Dispatch<IAppState>): IRetryCallbackProps => ({
  retryAction: () =>
    dispatch(fetchItemsAsync()),
});

const mergeProps = (_: undefined, { retryAction }: IRetryCallbackProps): IRetryProps => ({
  retryAction,
  description: 'Fetching items from server failed',
});

export const RetryList: ComponentClass = connect(
  undefined,
  mapDispatchToProps,
  mergeProps,
)(RetryComponent);
