import { connect, Dispatch } from 'react-redux';

import {
  Error as ErrorComponent,
  IErrorDispatchProps,
  IErrorStateProps,
} from '../components/Error';
import { IState } from '../store/IState';
import { dismissError, getItems } from '../actions';

interface IOwnProps {
  readonly itemKey: Key;
  readonly retry: boolean;
}

const mapStateToProps = ({ list: { errors }}: IState, { itemKey, retry }: IOwnProps): IErrorStateProps => ({
  error: errors.get(itemKey),
  itemKey,
  retry,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>, { itemKey }: IOwnProps): IErrorDispatchProps => ({
  onDismiss: () => dispatch(dismissError(itemKey)),
  onRetry: () => dispatch(getItems()),
});

export const Error = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
