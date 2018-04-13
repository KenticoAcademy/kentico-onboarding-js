import * as PropTypes from 'prop-types';
import { connect, Dispatch } from 'react-redux';
import {
  EditedItem,
  IEditedItemCallbackProps
} from '../../../components/todo-list/item/EditedItem';
import { deleteFromServer, putItem } from '../../../actions';
import { IAppState } from '../../../models/IAppState';
import { IndexedItem } from '../../../models/IndexedItem';
import { IAction } from '../../../actions/IAction';
import { cancelItemEditing } from '../../../actions/actionCreators';

interface IProps {
  readonly item: IndexedItem;
}

const mapDispatchToProps = (dispatch: Dispatch<IAppState>, ownProps: IProps): IEditedItemCallbackProps => ({
  onUpdateItem: (text: string): Promise<IAction> => dispatch(putItem({id: ownProps.item.id, text, isSynchronized: false})),
  onDeleteItem: (): Promise<IAction> => dispatch(deleteFromServer(ownProps.item.id)),
  onCancelEditing: (): IAction => dispatch(cancelItemEditing(ownProps.item.id)),
});

const connectedComponent = connect(undefined, mapDispatchToProps)(EditedItem);

connectedComponent.propTypes = {
  item: PropTypes.shape({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as EditedItem };
