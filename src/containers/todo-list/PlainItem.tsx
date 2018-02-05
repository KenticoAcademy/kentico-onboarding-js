import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { IPlainItemCallbackProps, PlainItem } from '../../components/todo-list/PlainItem';
import {
  closeItemError,
  editItem,
} from '../../actions/actionCreators';
import { IAppState } from '../../models/IAppState';
import { IndexedItem } from '../../models/IndexedItem';
import { IAction } from '../../actions/IAction';

interface IProps {
  readonly item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps): IPlainItemCallbackProps => ({
  onEditStart: (): IAction => dispatch(editItem(ownProps.item.id)),
  onCloseError: (): IAction => dispatch(closeItemError(ownProps.item.id))
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(PlainItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as PlainItem };
