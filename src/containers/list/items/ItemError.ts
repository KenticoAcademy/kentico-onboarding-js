import { Dispatch } from '../../../actions/types/Dispatcher';
import { retry } from '../../../actions/listActions';
import { closeError } from '../../../actions/thunks/closeError';
import {
  ItemError as ItemErrorComponent,
  IItemErrorDispatchProps,
  IItemErrorOwnProps,
} from '../../../components/list/items/ItemError';
import { ComponentClass } from 'react';
import { connect } from 'react-redux';

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: IItemErrorOwnProps,
): IItemErrorDispatchProps => ({
  retry: () => dispatch(retry(ownProps.error)),
  closeError: () => dispatch(closeError(ownProps.error)),
});

export const ItemError: ComponentClass<IItemErrorOwnProps> = connect(
  undefined,
  mapDispatchToProps,
)(ItemErrorComponent);
