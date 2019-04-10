import { connect } from 'react-redux';
import {
  IPlainItemDispatchProps,
  IPlainItemOwnProps,
  IPlainItemStateProps,
  PlainItem as PlainItemComponent,
} from '../../../components/list/items/PlainItem';
import { changeItemEditingMode } from '../../../actions/listActionCreators';
import { IStore } from '../../../store/types/IStore';
import { ComponentClass } from 'react';
import { Dispatch } from '../../../actions/types/Dispatcher';
import { ListError } from '../../../models/ListError';
import { ErrorsState } from '../../../store/types/ErrorsState';

const selectError = (errors: ErrorsState, itemId: Uuid): ListError =>
  errors.valueSeq().find((error: ListError) => error.itemId === itemId);

const mapStateToProps = (state: IStore, ownProps: IPlainItemOwnProps): IPlainItemStateProps => ({
  item: state.items.get(ownProps.id),
  error: selectError(state.errors, ownProps.id),
});

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IPlainItemOwnProps,
): IPlainItemDispatchProps => ({
  startEditing: () => dispatch(changeItemEditingMode(ownProps.id)),
});

export const PlainItem: ComponentClass<IPlainItemOwnProps> = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlainItemComponent);
