import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { EditedItem } from '../../components/todo-list/EditedItem';
import {
  updateItem,
  deleteItem,
  cancelItemEditing,
} from '../../actions/actionCreators';

const mapDispatchToProps = (dispatch, { item: { id } }) => ({
  onUpdateItem: (text) => dispatch(updateItem(id, text)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onEditStop: () => dispatch(cancelItemEditing(id)),
});

const enhancer = connect(undefined, mapDispatchToProps);
const connectedComponent = enhancer(EditedItem);

connectedComponent.propTypes = {
  item: ImmutablePropTypes.contains({
    index: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export { connectedComponent as EditedItem };
