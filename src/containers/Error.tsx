import { connect, ComponentClass, Dispatch } from 'react-redux';

import {
  Error as ErrorComponent,
  IErrorDispatchProps,
  IErrorStateProps,
} from '../components/Error';
import { IState } from '../store/IState';
import { Key } from '../@types/Key';
import { dismissError } from '../actions';

type IErrorComponentType = {
  itemKey: Key | undefined
};

const mapStateToProps = ({ list: { error }}: IState, { itemKey }: IErrorComponentType): IErrorStateProps => ({
  error: itemKey ? error.itemsError.get(itemKey) : error.globalError,
  itemKey,
});

const mapDispatchToProps = (dispatch: Dispatch<IState>, { itemKey }: IErrorComponentType): IErrorDispatchProps => ({
  onDismiss: () => dispatch(dismissError(itemKey)),
});

export const Error: ComponentClass<IErrorComponentType> = connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
