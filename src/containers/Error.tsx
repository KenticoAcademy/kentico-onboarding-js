import { connect, Dispatch } from 'react-redux';

import {
  Error as ErrorComponent,
  IErrorDispatchProps,
  IErrorStateProps,
  IErrorOwnProps,
} from '../components/Error';
import { IState } from '../store/IState';
import { dismissError } from '../actions';

const mapStateToProps = ({ list: { errors }}: IState, { itemKey }: IErrorOwnProps): IErrorStateProps => ({
  error: errors.get(itemKey),
});

const mapDispatchToProps = (dispatch: Dispatch<IState>, { itemKey }: IErrorOwnProps): IErrorDispatchProps => ({
  onDismiss: () => dispatch(dismissError(itemKey)),
});

export const Error: React.ComponentClass<IErrorOwnProps> = connect<IErrorStateProps, IErrorDispatchProps>(mapStateToProps, mapDispatchToProps)(ErrorComponent);
