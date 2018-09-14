import { connect } from 'react-redux';
import { Item } from '../components/Item';

import {
  cancelEdit,
  deleteItem,
  saveItem,
  startEdit
} from '../actions';

const mapStateToProps = (state, ownProps) => {
  return {
    item: state.items.get(ownProps.id)
  };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  onStartEdit: () => dispatch(startEdit(id)),
  onCancelEdit: () => dispatch(cancelEdit(id)),
  onDeleteItem: () => dispatch(deleteItem(id)),
  onSaveItem: (text) => dispatch(saveItem(id, text)),
});

const ConnectedItem = connect(mapStateToProps, mapDispatchToProps)(Item);
export { ConnectedItem as Item };
