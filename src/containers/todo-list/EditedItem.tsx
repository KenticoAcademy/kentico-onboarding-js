import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { EditedItem, IEditedItemCallbackProps } from '../../components/todo-list/EditedItem';
import {
  optimisticDelete,
  optimisticUpdate
} from '../../actions/index';
import { IAppState } from '../../models/IAppState';
import { IndexedItem } from '../../models/IndexedItem';
import { IAction } from '../../actions/IAction';
import { cancelItemEditing } from '../../actions/actionCreators';

interface IProps {
  readonly item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps): IEditedItemCallbackProps => ({
  onUpdateItem: (text: string): Promise<void | IAction> => dispatch(optimisticUpdate(ownProps.item.id, text)),
  onDeleteItem: (): Promise<void | IAction> => dispatch(optimisticDelete(ownProps.item.id)),
  onEditStop: (): IAction => dispatch(cancelItemEditing(ownProps.item.id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as EditedItem };
