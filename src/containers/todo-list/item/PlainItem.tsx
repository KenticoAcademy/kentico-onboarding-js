import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import {
  IPlainItemCallbackProps,
  IPlainItemDataProps,
  PlainItem
} from '../../../components/todo-list/item/PlainItem';
import {
  closeItemError,
  editItem,
} from '../../../actions/actionCreators';
import { IAppState } from '../../../models/IAppState';
import { IndexedItem } from '../../../models/IndexedItem';
import { IAction } from '../../../actions/IAction';

interface IProps {
  readonly item: IndexedItem;
}

const mapStateToProps = ({error}: IAppState, {item}: IProps): IPlainItemDataProps => ({
  errorMessage: item.errorId
    ? error.get(item.errorId).errorMessage
    : ''
});

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, {item}: IProps): IPlainItemCallbackProps => ({
  onEditStart: (): IAction => dispatch(editItem(item.id)),
  onCloseError: (): IAction => dispatch(closeItemError(item.id))
});

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(PlainItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as PlainItem };
