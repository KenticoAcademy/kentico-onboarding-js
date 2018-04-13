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

const mapStateToProps = ({error}: IAppState, {item}: IOwnProps): IPlainItemDataProps => ({
  errorMessage: item.errorId
    ? error.get(item.errorId).errorMessage
    : '',
  action: item.errorId
    ? error.get(item.errorId).action
    : ''
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {item}: IOwnProps): IDispatchProps => ({
  onEditStart: (): IAction => dispatch(editItem(item.id)),
  onCloseError: (action: string): Promise<IAction> | IAction => dispatch(closeError(action, item)),
  onRetry: (action: string): Promise<IAction> => dispatch(retry(action, item))
});

const mergeProps =
  (stateProps: IPlainItemDataProps,
   dispatchProps: IDispatchProps,
   ownProps: IOwnProps): IPlainItemProps => ({
    ...stateProps,
    onEditStart: (): IAction => dispatchProps.onEditStart(),
    onCloseError: (): Promise<IAction> | IAction => dispatchProps.onCloseError(stateProps.action),
    onRetry: (): Promise<IAction> => dispatchProps.onRetry(stateProps.action),
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
