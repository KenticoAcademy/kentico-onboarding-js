import { connect, Dispatch } from 'react-redux';

import {
  Error as ErrorComponent,
  IErrorDispatchProps,
  IErrorStateProps,
} from '../components/Error';
import { IState } from '../store/IState';
import { Key } from '../@types/Key';
import { dismissError } from '../actions';

interface IOwnProps {
  readonly itemKey: Key;
}

const mapStateToProps = ({ list: { errors }}: IState, { itemKey }: IOwnProps): IErrorStateProps => ({
  error: errors.get(itemKey),
  itemKey,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>, { itemKey }: IOwnProps): IErrorDispatchProps => ({
  onDismiss: () => dispatch(dismissError(itemKey)),
});

export const Error = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
