import { connect } from 'react-redux';

import { ListItemEditor as ListItemEditorComponent } from '../components/ListItemEditor';
import {
  changeItemValue,
  deleteItem,
  saveItem,
  toggleItemEditing,
} from '../actions';

const mapStateToProps = (state, ownProps) => ({
  item: ownProps.item,
  bullet: ownProps.bullet,
  itemValue: ownProps.item.changedValue,
});

const mapDispatchToProps = (dispatch, { item }) => ({
  onCancel: () => dispatch(toggleItemEditing(item)),
  onDelete: () => dispatch(deleteItem(item)),
  onSave: (itemValue) => dispatch(saveItem(item, itemValue)),
  onItemValueChange: (itemValue) => dispatch(changeItemValue(item, itemValue)),
});

export const ListItemEditor = connect(mapStateToProps, mapDispatchToProps)(ListItemEditorComponent);
