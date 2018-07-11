import { connect, Dispatch } from 'react-redux';

import {
  ErrorRetry as ErrorRetryComponent,
  IErrorRetryDispatchProps,
  IErrorRetryOwnProps,
} from '../components/ErrorRetry';
import { IState } from '../store/IState';
import { getItems } from '../actions';

const mapDispatchToProps = (dispatch: Dispatch<IState>): IErrorRetryDispatchProps => ({
  onRetry: () => dispatch(getItems()),
});

export const ErrorRetry: React.ComponentClass<IErrorRetryOwnProps> = connect<undefined, IErrorRetryDispatchProps>(undefined, mapDispatchToProps)(ErrorRetryComponent);
