import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import { EditedItem, IEditedItemCallbackProps } from '../../components/todo-list/EditedItem';
import {
  cancelItemEditing,
  putItem, deleteIt
} from '../../actions/actionCreators';
import { IAppState } from '../../models/IAppState';
import { IndexedItem } from '../../models/IndexedItem';
import { IAction } from '../../actions/IAction';

interface IProps {
  readonly item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps): IEditedItemCallbackProps => ({
  onUpdateItem: (text: string): Promise<void | IAction> => dispatch(putItem(ownProps.item.id, text)),
  onDeleteItem: (): Promise<void | IAction> => dispatch(deleteIt(ownProps.item.id)),
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
