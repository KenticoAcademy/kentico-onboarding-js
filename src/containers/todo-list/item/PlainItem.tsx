import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import {
  IOwnProps,
  IPlainItemDataProps,
  IPlainItemProps,
  PlainItem
} from '../../../components/todo-list/item/PlainItem';
import {
  editItem,
} from '../../../actions/actionCreators';
import { IAppState } from '../../../models/IAppState';
import { IAction } from '../../../actions/IAction';
import { retry } from '../../../actions/actionCreatorsFactories/retry';
import { closeError } from '../../../actions/closeError';

interface IDispatchProps {
  onEditStart: () => IAction;
  onCloseError: (action: string) => Promise<IAction> | IAction;
  onRetry: (action: string) => Promise<IAction>;
}

const mapStateToProps = ({error}: IAppState, {item}: IOwnProps): IPlainItemDataProps => {
  const itemError = error.get(item.id);

  return ({
    errorMessage: itemError && itemError.errorMessage,
    action: itemError && itemError.action
  });
};

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {item}: IOwnProps): IDispatchProps => ({
  onEditStart: () => dispatch(editItem(item.id)),
  onCloseError: (action: string) => dispatch(closeError(action, item)),
  onRetry: (action: string) => dispatch(retry(action, item))
});

const mergeProps =
  (stateProps: IPlainItemDataProps,
   dispatchProps: IDispatchProps,
   ownProps: IOwnProps): IPlainItemProps => ({
    ...stateProps,
    onEditStart: () => dispatchProps.onEditStart(),
    onCloseError: () => dispatchProps.onCloseError(stateProps.action),
    onRetry: () => dispatchProps.onRetry(stateProps.action),
    ...ownProps
  });

const connectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlainItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as PlainItem };
