import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import {
  IOwnProps,
  IPlainItemCallbackProps,
  IPlainItemDataProps,
  IPlainItemProps,
  PlainItem
} from '../../../components/todo-list/item/PlainItem';
import {
  closeItemError,
  editItem,
} from '../../../actions/actionCreators';
import { IAppState } from '../../../models/IAppState';
import { IAction } from '../../../actions/IAction';
import { retry } from '../../../actions/actionCreatorsFactories/retry';

const mapStateToProps = ({error}: IAppState, {item}: IOwnProps): IPlainItemDataProps => ({
  errorMessage: item.errorId
    ? error.get(item.errorId).errorMessage
    : '',
  action: item.errorId
    ? error.get(item.errorId).action
    : '',
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {item}: IOwnProps): IPlainItemCallbackProps => ({
  onEditStart: (): IAction => dispatch(editItem(item.id)),
  onCloseError: (): IAction => dispatch(closeItemError(item.id)),
  onRetry: (action: string): Promise<IAction> => dispatch(retry(action, item))
});

const mergeProps =
  (stateProps: IPlainItemDataProps,
   dispatchProps: IPlainItemCallbackProps,
   ownProps: IOwnProps): IPlainItemProps => ({
    ...stateProps,
    ...dispatchProps,
    onRetry: (): void => dispatchProps.onRetry(stateProps.action),
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
